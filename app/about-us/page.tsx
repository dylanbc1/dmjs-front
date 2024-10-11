'use client'

import { Navbar } from "@/components/navbar";
import Image from 'next/image';

const AboutUs = () => {

    const teamMembers = [
        { name: "Juan Jose Lopez", image: "/images/juan.png" },
        { name: "Dylan Bermudez", image: "/images/dylan.png" },
        { name: "Mateo Silva", image: "/images/mateo.png" },
        { name: "Diego Mueses", image: "/images/diego.png" },
        { name: "Sara Cardona", image: "/images/sara.png" },
    ];

    return (
        <div className="bg-[#F8F8F8]">
            <Navbar />
            <main className="px-3 lg:px-14 mx-auto max-w-4xl my-40">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Acerca de Nosotros</h1>
                    <p className="text-sm">Conoce a nuestro equipo</p>
                </div>
                <div className="flex justify-center space-x-8 mt-8 flex-wrap">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                                <Image src={member.image} alt={member.name} width={96} height={96} className="w-full h-full object-cover" />
                        
                            </div>
                            <p className="mt-2 text-center">{member.name}</p>
                        </div>
                    ))}
                </div>
                <hr className="my-8 border-gray-300" />
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Nuestra Historia</h2>
                    <p>
                        DMajor Store nació de la pasión por ofrecer productos de alta calidad y un servicio al cliente excepcional. Nuestro equipo está compuesto por profesionales dedicados a mejorar su experiencia de compra y asegurar que reciba el mejor valor por su dinero.
                    </p>
                    <h2 className="text-xl font-bold mt-8 mb-4">Nuestra Misión</h2>
                    <p>
                        Nos esforzamos por ser líderes en el comercio electrónico, ofreciendo una amplia gama de productos y un servicio al cliente inigualable. Creemos en la importancia de la satisfacción del cliente y trabajamos continuamente para superar sus expectativas.
                    </p>
                    <h2 className="text-xl font-bold mt-8 mb-4">Nuestros Valores</h2>
                    <p>
                        La integridad, la innovación y el compromiso con la excelencia son los pilares fundamentales de DMajor Store. Nos dedicamos a crear una comunidad inclusiva y respetuosa, donde cada cliente se sienta valorado y apreciado.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
