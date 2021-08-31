import React, { useState } from 'react'
import './index.less'

interface DialogProps {
  visible: boolean
  onCancel?: () => void
  onOk: () => Promise<void>
}

export function Dialog(props: DialogProps) {
  const { visible, onCancel, onOk } = props

	const handleCancel = () => {
		onCancel && onCancel();
	}
	
  return (
    <div className="delete-dialog-wrapper">
      <div className="dialog-body">
        <div className="dialog-header">
          <i className="iconfont icon-shanchu delete"></i>
          <span className="text">确认删除？</span>
        </div>
        <div className="dialog-footer">
          <div className="no-btn btn" onClick={() => handleCancel()}>No</div>
          <div className="yes-btn btn" onClick={() => onOk()}>Yes</div>
        </div>
      </div>
    </div>
  )
}
