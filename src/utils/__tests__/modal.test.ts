import { Modal as AntdModal } from 'antd';
import { modal } from '../modal';

jest.mock('antd', () => ({
  Modal: {
    error: jest.fn(),
  },
}));

describe('Modal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call AntdModal.error with the provided title and content', () => {
    const title = 'Error Title';
    const content = 'Error Content';

    modal.error({ title, content });

    expect(AntdModal.error).toHaveBeenCalledTimes(1);
    expect(AntdModal.error).toHaveBeenCalledWith({
      title,
      content,
      centered: true,
      maskClosable: true,
      okButtonProps: { className: 'bg-primary' },
      closable: true,
    });
  });
});
