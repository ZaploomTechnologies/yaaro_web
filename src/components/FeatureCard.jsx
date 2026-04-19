import { motion } from 'framer-motion';

export default function FeatureCard({ feature, index, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="gradient-border rounded-2xl overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-border">
        <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-3 ${feature.badgeColor}`}>
          {feature.badge}
        </span>
        <h3 className="text-xl font-semibold text-surface-text mb-2">{feature.title}</h3>
        <p className="text-surface-secondary text-sm leading-relaxed">{feature.description}</p>
      </div>

      {/* Card Content (children) */}
      <div className="p-6 bg-surface-bg/40">{children}</div>
    </motion.div>
  );
}
