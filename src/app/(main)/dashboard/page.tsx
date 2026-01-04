'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    getQuestionsList,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    getQuestionReplies,
    toggleFeedbackCheck,
    getDirectReplies,
    deleteReply,
} from '@/queries/Dashboard'
import { QuestionType } from '@/models/Questions.model'
import { QuestionInput } from '@/schemas/Questions.validation'
import { Plus } from 'lucide-react'
import { DirectFeedbackSection } from '@/components/dashboard/DirectFeedbackSection'
import { QuestionCard } from '@/components/dashboard/QuestionCard'
import { DirectReplyCard } from '@/components/dashboard/DirectReplyCard'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { QuestionFormDialog } from '@/components/dashboard/QuestionFormDialog'
import { ViewQuestionDialog } from '@/components/dashboard/ViewQuestionDialog'
import { DeleteConfirmationDialog } from '@/components/dashboard/DeleteConfirmationDialog'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const queryClient = useQueryClient()
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteQuestionDialogOpen, setDeleteQuestionDialogOpen] = useState(false)
    const [deleteReplyDialogOpen, setDeleteReplyDialogOpen] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null)
    const [editingQuestion, setEditingQuestion] = useState<QuestionType | null>(null)
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
    const [replyToDelete, setReplyToDelete] = useState<string | null>(null)

    const [createQuestionText, setCreateQuestionText] = useState('')
    const [editQuestionText, setEditQuestionText] = useState('')

    const { data: questions = [], isLoading: questionsLoading } = useQuery({
        queryKey: ['questions'],
        queryFn: getQuestionsList,
    })

    const { data: directReplies = [], isLoading: repliesLoading } = useQuery({
        queryKey: ['directReplies'],
        queryFn: getDirectReplies,
    })

    const { data: questionWithReplies, refetch: refetchQuestion } = useQuery({
        queryKey: ['question', selectedQuestion?._id],
        queryFn: () => getQuestionReplies(String(selectedQuestion!._id)),
        enabled: !!selectedQuestion && viewDialogOpen,
    })

    const createMutation = useMutation({
        mutationFn: createQuestion,
        onSuccess: () => {
            toast.success('Question created successfully')
            queryClient.invalidateQueries({ queryKey: ['questions'] })
            setCreateDialogOpen(false)
            setCreateQuestionText('')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const deleteQuestionMutation = useMutation({
        mutationFn: deleteQuestion,
        onSuccess: () => {
            toast.success('Question deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['questions'] })
            if (selectedQuestion?._id) {
                setViewDialogOpen(false)
                setSelectedQuestion(null)
            }
            setDeleteQuestionDialogOpen(false)
            setQuestionToDelete(null)
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const updateQuestionMutation = useMutation({
        mutationFn: ({ questionId, payload }: { questionId: string; payload: QuestionInput & { isActive?: boolean } }) =>
            updateQuestion(questionId, payload),
        onSuccess: () => {
            toast.success('Question updated successfully')
            queryClient.invalidateQueries({ queryKey: ['questions'] })
            queryClient.invalidateQueries({ queryKey: ['question'] })
            setEditDialogOpen(false)
            setEditingQuestion(null)
            setEditQuestionText('')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const toggleFeedbackMutation = useMutation({
        mutationFn: toggleFeedbackCheck,
        onSuccess: async () => {
            await update()
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const deleteReplyMutation = useMutation({
        mutationFn: deleteReply,
        onSuccess: () => {
            toast.success('Reply deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['directReplies'] })
            setDeleteReplyDialogOpen(false)
            setReplyToDelete(null)
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const handleCreateQuestion = (data: QuestionInput) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                // Success handled in mutation
            },
            onError: () => {
                // Error handled by toast
            }
        })
    }

    const handleViewQuestion = (question: QuestionType) => {
        setSelectedQuestion(question)
        setViewDialogOpen(true)
    }

    const handleEditQuestion = (question: QuestionType) => {
        setEditingQuestion(question)
        setEditQuestionText(question.questionText)
        setEditDialogOpen(true)
    }

    const handleUpdateQuestion = (data: QuestionInput) => {
        if (!editingQuestion?._id) return
        updateQuestionMutation.mutate({
            questionId: String(editingQuestion._id),
            payload: data
        })
    }

    const handleToggleActive = (checked: boolean) => {
        if (!selectedQuestion?._id) return
        updateQuestionMutation.mutate({
            questionId: String(selectedQuestion._id),
            payload: {
                questionText: selectedQuestion.questionText,
                isActive: checked
            }
        })
    }

    const handleDeleteQuestion = (questionId: string | unknown) => {
        setQuestionToDelete(String(questionId))
        setDeleteQuestionDialogOpen(true)
    }

    const handleDeleteReply = (replyId: string | unknown) => {
        setReplyToDelete(String(replyId))
        setDeleteReplyDialogOpen(true)
    }

    const confirmDeleteQuestion = () => {
        if (questionToDelete) {
            deleteQuestionMutation.mutate(questionToDelete)
        }
    }

    const confirmDeleteReply = () => {
        if (replyToDelete) {
            deleteReplyMutation.mutate(replyToDelete)
        }
    }

    const isReceivingFeedback = session?.user?.isReceivingFeedback ?? true

    return (
        <div className="min-h-screen max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="gradientText font-bold text-[30px]">
                        User Dashboard
                    </h1>
                    <p className="font-semibold mt-1 text-foreground text-sm">
                        Welcome back, {session?.user?.fullName}
                    </p>
                </div>

                <DirectFeedbackSection
                    username={session?.user?.username}
                    isReceivingFeedback={isReceivingFeedback}
                    onToggleFeedback={() => toggleFeedbackMutation.mutate()}
                    isToggling={toggleFeedbackMutation.isPending}
                />

                <Tabs defaultValue="questions" className="w-full">
                    <TabsList className="bg-muted gap-2">
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                        <TabsTrigger value="replies">Direct Replies</TabsTrigger>
                    </TabsList>

                    <TabsContent value="questions" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Your Questions</h2>
                            <Button
                                onClick={() => setCreateDialogOpen(true)}
                                className="gradientBtn"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Question
                            </Button>
                        </div>

                        <Card className="cardBg">
                            <CardContent className="py-4 text-center">
                                {questionsLoading ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Loading questions...
                                    </div>
                                ) : questions.length === 0 ? (
                                    <EmptyState message="No questions yet. Create your first question!" />
                                ) : (
                                    <>
                                        <h3 className="font-semibold text-xl mb-5 text-left">
                                            Questions List:
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {questions.map((question: QuestionType) => (
                                                <QuestionCard
                                                    key={String(question._id)}
                                                    question={question}
                                                    onView={handleViewQuestion}
                                                    onEdit={handleEditQuestion}
                                                    onDelete={handleDeleteQuestion}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="replies" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Direct Replies</h2>
                        </div>

                        <Card className="cardBg">
                            <CardContent className="py-12 text-center">
                                {repliesLoading ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Loading replies...
                                    </div>
                                ) : directReplies.length === 0 ? (
                                    <EmptyState message="No direct replies yet." />
                                ) : (
                                    <div className="space-y-3">
                                        {directReplies.map((reply) => (
                                            <DirectReplyCard
                                                key={String(reply._id)}
                                                reply={reply}
                                                onDelete={handleDeleteReply}
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Create Question Dialog */}
            <QuestionFormDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                title="Create New Question"
                description="Create a question that others can answer anonymously."
                questionText={createQuestionText}
                onQuestionTextChange={setCreateQuestionText}
                onSubmit={handleCreateQuestion}
                onCancel={() => {
                    setCreateDialogOpen(false)
                    setCreateQuestionText('')
                }}
                isSubmitting={createMutation.isPending}
                error={createMutation.error?.message}
                submitLabel={createMutation.isPending ? 'Creating...' : 'Create Question'}
            />

            {/* Edit Question Dialog */}
            <QuestionFormDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                title="Edit Question"
                description="Update your question text"
                questionText={editQuestionText}
                onQuestionTextChange={setEditQuestionText}
                onSubmit={handleUpdateQuestion}
                onCancel={() => {
                    setEditDialogOpen(false)
                    setEditingQuestion(null)
                    setEditQuestionText('')
                }}
                isSubmitting={updateQuestionMutation.isPending}
                error={updateQuestionMutation.error?.message}
                submitLabel={updateQuestionMutation.isPending ? 'Updating...' : 'Update Question'}
            />

            <ViewQuestionDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                question={selectedQuestion}
                questionWithReplies={questionWithReplies || null}
                isActive={questionWithReplies?.isActive ?? selectedQuestion?.isActive ?? false}
                onToggleActive={handleToggleActive}
                onRefresh={() => refetchQuestion()}
                isUpdating={updateQuestionMutation.isPending}
            />

            <DeleteConfirmationDialog
                open={deleteQuestionDialogOpen}
                onOpenChange={setDeleteQuestionDialogOpen}
                title="Delete Question"
                description="Are you sure you want to delete this question? This action cannot be undone and all associated replies will also be deleted."
                onConfirm={confirmDeleteQuestion}
                onCancel={() => {
                    setDeleteQuestionDialogOpen(false)
                    setQuestionToDelete(null)
                }}
                isDeleting={deleteQuestionMutation.isPending}
                confirmLabel={deleteQuestionMutation.isPending ? 'Deleting...' : 'Delete Question'}
            />

            <DeleteConfirmationDialog
                open={deleteReplyDialogOpen}
                onOpenChange={setDeleteReplyDialogOpen}
                title="Delete Reply"
                description="Are you sure you want to delete this reply? This action cannot be undone."
                onConfirm={confirmDeleteReply}
                onCancel={() => {
                    setDeleteReplyDialogOpen(false)
                    setReplyToDelete(null)
                }}
                isDeleting={deleteReplyMutation.isPending}
                confirmLabel={deleteReplyMutation.isPending ? 'Deleting...' : 'Delete Reply'}
            />
        </div>
    )
}

export default Dashboard
