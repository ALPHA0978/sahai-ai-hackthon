const WelcomePanel = ({ isSignUp }) => {
  return (
    <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none" style={{ backgroundImage: 'url(/login_image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

    
    </div>
  );
};

export default WelcomePanel;