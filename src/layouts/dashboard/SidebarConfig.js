import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import calendarOutline from '@iconify/icons-eva/calendar-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
    allowed: ['ADMIN', 'DOCTOR', 'STUDENT', 'PROF']
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
    allowed: ['ADMIN', 'DOCTOR']
  },
  {
    title: 'Classrooms',
    path: '/dashboard/classrooms',
    icon: getIcon(calendarOutline),
    allowed: ['ADMIN', 'PROF']
  },
  {
    title: 'Cours',
    path: '/dashboard/courses',
    icon: getIcon(shoppingBagFill),
    allowed: ['ADMIN', 'DOCTOR', 'STUDENT', 'PROF']
  }
];

export default sidebarConfig;
