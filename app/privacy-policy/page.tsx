
'use client'

import { Navbar } from "@/components/navbar";

const PrivacyPolicy = () => {


    return (
        <div className="bg-[#F8F8F8]">
            <Navbar />
            
            <main className="px-3 lg:px-14 mx-auto max-w-4xl my-40">
                <div className="text-center">
                    <h1 className="text-lg font-bold mb-2">EXHIBIT A</h1>
                    <h2 className="text-2xl font-bold mb-2">DMajor Store</h2>
                    <h3 className="text-xl font-bold mb-2">Política de Privacidad</h3>
                    <p className="text-sm">Actualizado 06-23-24</p>
                </div>
                <hr className='my-4 border-gray-300'/>
                <p className="mt-8">
                    En nuestro e-commerce, valoramos y respetamos la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal.
                </p>
                <ul className="list-disc list-inside">
                    <li>Procesar y gestionar sus pedidos.</li>
                    <li>Enviarle actualizaciones sobre el estado de sus pedidos.</li>
                    <li>Proporcionarle atención al cliente y responder a sus consultas.</li>
                    <li>Mejorar nuestros productos y servicios.</li>
                    <li>Enviar comunicaciones promocionales y ofertas especiales, siempre que haya dado su consentimiento para recibirlas.</li>
                </ul>
                <h2 className="text-xl font-bold mt-4">3. Protección de la información</h2>
                <p>
                    Implementamos medidas de seguridad adecuadas para proteger su información personal contra el acceso no autorizado, la alteración, divulgación o destrucción de la misma. Sin embargo, debe tener en cuenta que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
                </p>
                <h2 className="text-xl font-bold mt-4">4. Compartir información con terceros</h2>
                <p>
                    No vendemos, comercializamos ni transferimos su información personal a terceros sin su consentimiento, excepto para los proveedores de servicios que nos ayudan a operar nuestro sitio web, llevar a cabo nuestro negocio o servirle, siempre y cuando estos terceros acuerden mantener esta información confidencial.
                </p>
                <h2 className="text-xl font-bold mt-4">5. Sus derechos</h2>
                <p>
                    Usted tiene derecho a acceder, corregir y eliminar su información personal. Puede ejercer estos derechos contactándonos a través de la información de contacto proporcionada en nuestro sitio web.
                </p>
                <h2 className="text-xl font-bold mt-4">6. Cambios en nuestra política de privacidad</h2>
                <p>
                    Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en nuestro sitio web.
                </p>
                
                
            </main>
        </div>
    );
};

export default PrivacyPolicy;
