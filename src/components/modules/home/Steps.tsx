import { Search, UserCheck, CalendarDays, ClipboardCheck } from "lucide-react";

const steps = [
  {
    title: "Search Best Online Professional",
    description: "Find the right doctor based on your health needs and preference.",
    icon: <Search className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "View Professional Profile",
    description: "Check credentials, patient reviews, and availability of doctors.",
    icon: <UserCheck className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Book an Appointment",
    description: "Select a convenient time slot and confirm your booking instantly.",
    icon: <CalendarDays className="w-8 h-8 text-emerald-500" />,
    color: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Get Your Solution",
    description: "Consult with the professional and get your health problems solved.",
    icon: <ClipboardCheck className="w-8 h-8 text-orange-500" />,
    color: "bg-orange-50 dark:bg-orange-900/20",
  },
];

const Steps = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            How it <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow these simple steps to get the best healthcare services from our experienced professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border flex items-center justify-center font-bold text-primary shadow-sm">
                0{index + 1}
              </div>
              
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
