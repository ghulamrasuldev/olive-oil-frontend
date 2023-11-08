import React from "react";
import { Table, TableBody, TableRow, TableCell, Skeleton } from "@mui/material";

// const UniversalTableSkeleton = ({ rows, columns }) => {
//   console.log("<><><><>", rows, columns);
//   return (
//     <Table>
//       <TableBody>
//         {[...Array(rows)].map((_, rowIndex) => (
//           <TableRow key={rowIndex}>
//             {[...Array(columns)].map((_, colIndex) => (
//               <TableCell key={colIndex}>
//                 <Skeleton variant="text" animation="wave" />
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default UniversalTableSkeleton;

const UniversalTableSkeleton = ({ rowsNum, columnsNum }) => {
  return (
    <Table>
      <TableBody>
        {[...Array(rowsNum)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(columnsNum)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UniversalTableSkeleton;
