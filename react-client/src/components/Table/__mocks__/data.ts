import { TAG_COLOR } from '../../../atoms';
import { TableProps } from '../Table';

export const tableData1: TableProps = {
  columns: ['Môn học', 'Điểm dự đoán', 'Định hướng'],
  data: [
    {
      courseId: 'INT3111',
      courseName: 'Quản lý dự án phần mềm',
      grade: 9.1,
      orientation: { title: 'Thương mại điện tử', color: TAG_COLOR[2] },
    },
    {
      courseId: 'INT3135',
      courseName: 'Tính toán di động',
      grade: 8.5,
      orientation:{ title: 'Mạng máy tính', color: TAG_COLOR[0] },
    },
    {
      courseId: 'INT3404',
      courseName: 'Xử lý ảnh',
      grade: 7.5,
      orientation:{ title: 'Tương tác người - máy', color: TAG_COLOR[1] } 
    },
    {
      courseId: 'INT3306',
      courseName: 'Phát triển ứng dụng Web',
      grade: 7.0,
      orientation: { title: 'Thương mại điện tử', color: TAG_COLOR[2] } 
    },
    {
      courseId: 'INT3402',
      courseName: 'Chương trình dịch',
      grade: 6.4,
      orientation: { title: 'Các hệ thống thông minh', color: TAG_COLOR[3] } 
    },
  ],
};

export const tableData2: TableProps = {
  columns: ['Môn học', 'Điểm dự đoán', 'Điểm quy đổi'],
  data: [
    {
      courseId: 'INT3111',
      courseName: 'Quản lý dự án phần mềm',
      grade: 9.1,
      gradeConversion: 'A+',
    },
    {
      courseId: 'INT3135',
      courseName: 'Tính toán di động',
      grade: 8.5,
      gradeConversion: 'A',
    },
    {
      courseId: 'INT3404',
      courseName: 'Xử lý ảnh',
      grade: 7.5,
      gradeConversion: 'B',
    },
    {
      courseId: 'INT3306',
      courseName: 'Phát triển ứng dụng Web',
      grade: 7.0,
      gradeConversion: 'B',
    },
    {
      courseId: 'INT3402',
      courseName: 'Chương trình dịch',
      grade: 6.4,
      gradeConversion: 'C',
    },
  ],
};
