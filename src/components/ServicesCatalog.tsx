import React, { useState } from 'react';
import { 
  DENTAL_SERVICES, 
  DentalService 
} from '../config/services';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Smile,
  Zap,
  Activity,
  Scissors
} from 'lucide-react';

interface ServicesCatalogProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  onSelectServiceToBook
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Preventive',
    'Restorative',
    'Cosmetic',
    'Orthodontics',
    'Oral Surgery',
    'Emergency'
  ];

  const filtered = activeCategory === 'All'
    ? DENTAL_SERVICES
    : DENTAL_SERVICES.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Preventive': return <Sparkles size={16} className="text-teal-600" />;
      case 'Restorative': return <Shield size={16} className="text-blue-600" />;
      case 'Cosmetic': return <Smile size={16} className="text-amber-600" />;
      case 'Orthodontics': return <Smile size={16} className="text-indigo-600" />;
      case 'Oral Surgery': return <Scissors size={16} className="text-rose-600" />;
      case 'Emergency': return <Zap size={16} className="text-red-600" />;
      default: return <Activity size={16} className="text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Transparent Clinic Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Comprehensive Dental Procedures
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Clear, honest pricing with zero hidden surcharges. All treatments administered under strict sterile autoclave protocol.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-teal-300 transition-all group"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {getCategoryIcon(service.category)}
                    <span>{service.category}</span>
                  </div>
                  {service.popular && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                      Most Requested
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Recommendation Tag */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Ideal for:</strong> {service.recommendedFor}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Starting Fee</div>
                  <div className="text-base sm:text-lg font-extrabold text-teal-700 font-mono">
                    {service.priceRange}
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-sm group-hover:bg-teal-600"
                >
                  <span>Book Slot</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
