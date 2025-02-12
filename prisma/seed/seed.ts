import { faker } from "@faker-js/faker";
import { prisma } from "../../src/lib/prisma";
import { Point, Route } from "@prisma/client";
import { serialize } from "v8";

async function Seed() {
    const routes:Route[] = []; 
    const points:Point[] = []; 
    console.log("Rodando")
    for(let i=0;i<9;i++){
        routes.push(await prisma.route.create({
            data:{
                RouteType:"Land",
                Title:faker.lorem.word(),
                Description:faker.lorem.paragraph(),
            }
        }))
        console.log(routes)
    }

    for(let i=0;i<routes.length;i++){
        points.push(await prisma.point.create({
            data:{
                Name:faker.location.city(),
                UF:faker.location.state(),
                Description:faker.lorem.paragraph(),
                Airports:i%3==0,
                Railroads:i%2==0,
                Ports:i%4==0,
                route_id:routes[i].Id
            }
        }));
        console.log(points)
    }

    for(let i=0;i<points.length-1;i++){
        await prisma.travel.create({
            data:{
                Travel_Day:faker.date.future(),
                TravelBasePrice:faker.number.int({min:100,max:10000}),
                BeginningPointId:points[i].Id,
                FinnishPointId:points[i+1].Id
            }
        })
    }
    const companys = await prisma.company.findMany()
    if(companys[0] == null){
        for(let i=0;i<7;i++){
            await prisma.company.create({
                data:{
                    CNPJ:faker.color.rgb(),
                    Name:faker.company.name(),
                }
            })
        }
    }
}


(async()=>{ 
    await Seed();
})()