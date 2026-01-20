import { motion } from "framer-motion";

interface FeedMeLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const FeedMeLogo = ({ size = "md", showText = true }: FeedMeLogoProps) => {
  const sizes = {
    sm: { icon: "text-2xl", text: "text-xl" },
    md: { icon: "text-4xl", text: "text-2xl" },
    lg: { icon: "text-6xl", text: "text-4xl" },
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <span className={`${sizes[size].icon} animate-float`}>🍜</span>
      {showText && (
        <span className={`${sizes[size].text} font-display font-bold text-gradient-nature`}>
          FeedMe
        </span>
      )}
    </motion.div>
  );
};

export default FeedMeLogo;
