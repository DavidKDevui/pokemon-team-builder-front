'use client';

 
interface SocialLinkProps {
  platform: string;
  icon: string;
  url: string;
}

const SocialLink = ({ platform, icon, url }: SocialLinkProps) => {

    
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-[8px] shadow-md backdrop-blur-sm transition-all duration-150 cursor-pointer"
    >
      <div className="text-3xl mr-3 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <span className="text-white text-lg font-press-start-2p">{platform}</span>
    </a>
  );
};

export default function Community() {
  const socialLinks = [
    {
      platform: 'Discord',
      icon: '💬',
      url: 'https://discord.gg/your-discord-link'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/'
    },
    {
      platform: 'Reddit',
      icon: '📱',
      url: 'https://reddit.com/r/your-subreddit'
    }
  ];

  return (
    <section className="py-16 md:py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-[#f1c40f] text-2xl md:text-3xl font-press-start-2p text-center mb-8">
        Rejoignez Notre Communauté
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            platform={link.platform}
            icon={link.icon}
            url={link.url}
          />
        ))}
      </div>
    </section>
  );
} 