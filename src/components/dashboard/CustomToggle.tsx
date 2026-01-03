import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CustomToggle = ({ isActive, isToggling, onToggleFeedback, onQuestionToggle, isInQuestion }: { isActive: boolean, isToggling: boolean, onToggleFeedback?: () => void, onQuestionToggle?: (check: boolean) => void, isInQuestion?: boolean }) => {
    return (
        <div className="flex items-center justify-between bg-muted/50 rounded-lg ">
            <div
                onClick={() => {
                    if (isToggling) return
                    if (onQuestionToggle !== undefined) {
                        onQuestionToggle(!isActive)
                    } else if (onToggleFeedback !== undefined) {
                        onToggleFeedback()
                    }
                }}
                className="flex items-center gap-4 cursor-pointer select-none"
            >
                <motion.div
                    className="relative h-6 w-12 rounded-full"
                    animate={{
                        backgroundColor: isActive ? '#7f1df7' : '#9ca3af'
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                        boxShadow: isActive
                            ? '0 0 14px rgba(127,29,247,0.6)'
                            : 'none'
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isToggling ? (
                            <motion.div
                                key="loader"
                                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-white"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                style={{
                                    right: isActive ? '0.25rem' : 'auto',
                                    left: !isActive ? '0.25rem' : 'auto'
                                }}
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </motion.div>
                        ) : (
                            <motion.span
                                key="knob"
                                className="absolute top-1/2 h-4 w-4 rounded-full bg-white"
                                initial={false}
                                animate={{
                                    x: isActive ? 24 : 4
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30
                                }}
                                style={{ translateY: '-50%' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="flex flex-col">
                    <motion.p
                        className="text-sm font-medium"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isActive ? isInQuestion ? "Accepting answers" : 'Accepting feedback' : isInQuestion ? "Answers paused" : 'Feedback paused'}
                    </motion.p>
                    <motion.p
                        className="text-xs text-muted-foreground"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isActive
                            ? isInQuestion ? "Anyone with the link can send answers." : 'Anyone with the link can send feedback'
                            : isInQuestion ? "Your question link is temporarily disabled" : 'Your feedback link is temporarily disabled'}
                    </motion.p>
                </div>
            </div>
        </div>

    )
}

export default CustomToggle
