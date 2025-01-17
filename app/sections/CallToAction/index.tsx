import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CallToAction() {
  const scrollToSection = () => {
    const section = document.getElementById("cardapio-secao");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="space-x-9 space-y-9 relative flex flex-col-reverse md:flex-row items-center dark:bg-gray-900 bg-gray-100 text-muted-foreground py-10 px-6 md:px-16 lg:px-32 rounded-lg shadow-lg">
      {/* Coluna da Imagem */}
      <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
        <Image
          src="/images/nutricao.jpg"
          alt="Personalized Nutrition Coach"
          width={800}
          height={800}
          layout="intrinsic"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Coluna do Texto */}
      <div className="
      w-full
       md:w-1/2 
       space-y-6 
       md:text-left 
       flex 
       flex-col 
       items-center 
       md:items-start">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Nutrição <span className="text-red-600">inteligente</span> para seu corpo.
        </h1>
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
          Cardápios Balanceados Criados pela IA
        </h2>
        <p className="text-lg text-muted-foreground">
          Deixe a tecnologia calcular a melhor alimentação para você! Com nossa IA, seu cardápio será gerado com base nas suas necessidades nutricionais, como calorias, proteínas, carboidratos e gorduras. Obtenha um plano alimentar equilibrado e adequado ao seu perfil, sem esforço e com máxima precisão. Uma solução prática e personalizada para otimizar sua nutrição de forma simples e eficaz.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          {/* Chama a função de rolar quando o botão for clicado */}
          <Button onClick={scrollToSection} className="h-14 bg-green-600 text-white hover:bg-green-700">
            Crie seu Cardápio Agora
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Mais de 120 clientes já geraram seus cardápios personalizados</span>
        </div>
      </div>
    </section>
  );
}
