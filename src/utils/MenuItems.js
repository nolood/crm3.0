import {
  BankOutlined,
  AuditOutlined,
  ExceptionOutlined,
  FormOutlined,
  TabletOutlined,
} from '@ant-design/icons-vue';

export const menuItems = [
  {
    id: 1,
    title: 'Счёт',
    route: '/',
    icon: BankOutlined,
  },
  {
    id: 2,
    title: 'История',
    route: '/history',
    icon: AuditOutlined,
  },
  {
    id: 3,
    title: 'Планирование',
    route: '/planning',
    icon: ExceptionOutlined,
  },
  {
    id: 4,
    title: 'Новая запись',
    route: '/record',
    icon: FormOutlined,
  },
  {
    id: 5,
    title: 'Категории',
    route: '/categories',
    icon: TabletOutlined,
  },
];

export const dropDownItems = [
  {
    id: 1,
    title: 'Profile',
  },
];
