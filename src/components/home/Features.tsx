'use client';

 
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
 

  return (
    <div 
      className="flex flex-col items-center p-6 md:p-8 bg-white/5 hover:bg-white/10 rounded-[8px] backdrop-blur-sm transition-all duration-150 cursor-pointer"
 
    >
      <div className="text-4xl mb-4 transform transition-transform duration-300 ">
        {icon}
      </div>
      <h3 className="text-[#f1c40f] text-xl md:text-base font-press-start-2p mb-4 text-center font-bold">
        {title}
      </h3>
      <p className="text-white text-xs md:text-xs text-center font-press-start-2p text-[0.7rem] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Statistiques Avancées',
      description: 'Analysez les forces et faiblesses de votre équipe en un coup d\'œil'
    },
    {
      icon: '🛡️',
      title: 'Gestion des Types',
      description: 'Optimisez la couverture des types pour une équipe équilibrée'
    },
    {
      icon: '📊',
      title: 'Métriques Détaillées',
      description: 'Suivez les performances de votre équipe avec des graphiques précis'
    }
  ];

  return (
    <section className="py-16 md:py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
} 