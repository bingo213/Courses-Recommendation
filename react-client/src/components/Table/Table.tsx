import React from 'react';
import styled from 'styled-components';
import { COLORS, ProgressBar, Tag, TagProps } from '../../atoms';

export interface TableRowProps {
  courseId: string;
  courseName: string;
  grade: number;
  orientation?: TagProps;
  gradeConversion?: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';
}

export interface TableProps {
  columns: string[];
  data: TableRowProps[];
}

export const Table: React.FC<TableProps> = ({ columns, data }: TableProps) => {
  const rand256 = () => Math.floor(Math.random() * 256) + 1;
  return (
    <TableWrapper>
      <TableRow className="table-head">
        {columns.map((col, index) => (
          <TableHead key={index} className={`th-${index}`}>
            {col}
          </TableHead>
        ))}
      </TableRow>
      {data.map((val, index) => {
        return (
          <TableRow key={index} className="table-data">
            <TableData className="td-0">
              <CourseID>{val.courseId}</CourseID>
              <CourseName>{val.courseName}</CourseName>
            </TableData>
            <TableData className="td-1">
              <ProgressBar progress={val.grade * 10} style={{ flex: 8 }} />
              <Grade>{val.grade}</Grade>
            </TableData>
            {val?.orientation && (
              <TableData className="td-2">
                <Tag {...val.orientation} />
              </TableData>
            )}
            {val?.gradeConversion && (
              <TableData className="td-2" style={{ fontWeight: 500 }}>
                {val.gradeConversion}
              </TableData>
            )}
          </TableRow>
        );
      })}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  border: 1px solid ${COLORS.line100};
  border-radius: 10px;
  .table-head {
    color: ${COLORS.primary600};
    background: ${COLORS.primary100};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-weight: 500;
    font-size: 15px;
  }
  .table-data {
    border-top: 1px solid ${COLORS.line100};
  }
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 24px;
  .th-0,
  .th-2,
  .td-0,
  .td-2 {
    width: 25%;
  }
  .th-1,
  .td-1 {
    width: 50%;
  }
  .td-1 {
    font-weight: 500;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
`;

const TableHead = styled.div``;

const TableData = styled.div``;

const CourseID = styled.div`
  font-weight: 500;
`;

const CourseName = styled.div`
  font-weight: 200;
  font-size: 13px;
`;

const Grade = styled.div`
  margin: 0 32px;
  flex: 1;
`;
