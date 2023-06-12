import React, { useEffect } from 'react'
import { selectUi } from 'src/store/ui'
import { useModal } from 'react-hooks-use-modal'
import { useSelector } from 'react-redux';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
	width: '200px',
	height: '240px',
  borderRadius: '10px',
};

export const NotificationModal = () => {
	const { showNotification } = useSelector(selectUi)

	useEffect(() => {
		showNotification? open() : close()
	}, [showNotification])

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true
  })
  return (
    <div>
      <Modal>
        <div style={modalStyle}>
          <h3>更新内容</h3>
          <div>
            {`1、修复加入单词错误问题`}
					</div>
        </div>
      </Modal>
    </div>
  )
}
