import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ElementType;
    className?: string;
}

export function EmptyState({ 
    title = "No data available", 
    description = "There is currently no data to display here. Please check back later.", 
    icon: Icon = Database,
    className
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-12 text-center w-full min-h-[300px] border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50", className)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                    duration: 0.5, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="flex flex-col items-center"
            >
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                    <motion.div
                        animate={{ 
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Icon className="w-10 h-10 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                    </motion.div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                    {description}
                </p>
            </motion.div>
        </div>
    );
}
