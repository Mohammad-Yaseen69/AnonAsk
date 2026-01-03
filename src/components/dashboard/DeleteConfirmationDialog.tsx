'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
    isDeleting: boolean
    confirmLabel?: string
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    onCancel,
    isDeleting,
    confirmLabel = 'Delete'
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] cardBg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        style={{
                            padding: "0 15px"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        style={{
                            padding: "0 15px",
                            backgroundColor: "#ff2727cf"
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

