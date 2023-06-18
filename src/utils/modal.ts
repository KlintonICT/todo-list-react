import { Modal as AntdModal } from 'antd';

interface IErrorModal {
  title: string;
  content?: string;
}

export const modal = {
  error: ({ title, content }: IErrorModal) => {
    AntdModal.error({
      title,
      content,
      centered: true,
      maskClosable: true,
      okButtonProps: { className: 'bg-primary' },
      closable: true,
    });
  },
};
