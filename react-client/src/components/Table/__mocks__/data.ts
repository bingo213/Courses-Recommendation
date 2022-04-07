import { TableProps } from '../Table';

export const tableData1: TableProps = {
  columns: ['Môn học', 'Điểm dự đoán', 'Định hướng'],
  data: [
    {
      courseId: 'INT3111',
      courseName: 'Quản lý dự án phần mềm',
      grade: 9.1,
      orientation: 'Thương mại điện tử',
    },
    {
      courseId: 'INT3135',
      courseName: 'Tính toán di động',
      grade: 8.5,
      orientation: 'Mạng máy tính',
    },
    {
      courseId: 'INT3404',
      courseName: 'Xử lý ảnh',
      grade: 7.5,
      orientation: 'Tương tác người - máy',
    },
    {
      courseId: 'INT3306',
      courseName: 'Phát triển ứng dụng Web',
      grade: 7.0,
      orientation: 'Thương mại điện tử',
    },
    {
      courseId: 'INT3402',
      courseName: 'Chương trình dịch',
      grade: 6.4,
      orientation: 'Các hệ thống thông minh',
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
  