import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-sm font-bold mb-8 animate-bounce">
            <Activity size={16} />
            <span>Smart Healthcare Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white">
            Your Health, <br className="hidden md:block" />
            Our <span className="text-primary italic">Priority</span> & Mission
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Experience the future of healthcare with CareIntel. Connect with top specialists, book appointments, and manage your health records seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-7 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
              Get Started Now
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-7 text-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 w-full">
            <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20">
              <span className="text-3xl font-bold text-primary">10k+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Patients</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20">
              <span className="text-3xl font-bold text-primary">500+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Specialists</span>
            </div>
            <div className="hidden md:flex flex-col items-center gap-2 p-6 rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20">
              <span className="text-3xl font-bold text-primary">99%</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
