import { Modal as AntdModal } from 'antd';

interface IErrorModal {
  title: string;
  content?: string;
}

const Modal = {
  error: ({title, content}: IErrorModal) => {
    AntdModal.error({
      title,
      content,
      centered: true,
      maskClosable: true,
      okButtonProps: { className: 'bg-primary' },
      closable: true
    });
  },
};

export default Modal;
