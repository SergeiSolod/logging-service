import { FC } from "react";
import moment from "moment";
import styles from "./Table.module.scss";
import clsx from "clsx";

interface TableProps {
  columns?: Array<any>;
  rows?: Array<any>;
  left?: boolean;
  border?: boolean;
  equal?: boolean;
  onOpenRow?: () => void;
  noData?: string;
  colored?: boolean;
  maxValue?: number;
}

const Table: FC<TableProps> = ({
  columns = [],
  rows = [],
  left = false,
  border = false,
  equal = false,
  onOpenRow = () => {},
  noData = "No data",
  colored = false,
  maxValue = 0,
}) => {
  const returnColor = (value: number) => {
    if (colored) {
      if (value <= (maxValue / 10) * 1) {
        return "rgb(0,114,240, 0.1)";
      } else if (value <= (maxValue / 10) * 2) {
        return "rgb(0,114,240, 0.2)";
      } else if (value <= (maxValue / 10) * 3) {
        return "rgb(0,114,240, 0.3)";
      } else if (value <= (maxValue / 10) * 4) {
        return "rgb(0,114,240, 0.4)";
      } else if (value <= (maxValue / 10) * 5) {
        return "rgb(0,114,240, 0.5)";
      } else if (value <= (maxValue / 10) * 6) {
        return "rgb(0,114,240, 0.6)";
      } else if (value <= (maxValue / 10) * 7) {
        return "rgb(0,114,240, 0.7)";
      } else if (value <= (maxValue / 10) * 8) {
        return "rgb(0,114,240, 0.8)";
      } else if (value <= (maxValue / 10) * 9) {
        return "rgb(0,114,240, 0.9)";
      } else if (value <= maxValue) {
        return "rgb(0,114,240, 1)";
      }
    } else {
      return "rgb(255,255,255)";
    }
  };

  return (
    <div className={styles.table}>
      <table>
        <thead className={styles.header}>
          <tr>
            {columns?.length &&
              columns?.map((column) => {
                if (column.type === "hidden") {
                  return <th className={styles.label} key={column.key} />;
                }
                return (
                  <th className={styles.label} key={column.key}>
                    {column.title}
                  </th>
                );
              })}
          </tr>
        </thead>

        <tbody className={styles.body}>
          {rows?.length
            ? rows?.map((row, index) => {
                const { id = "" } = row;
                return (
                  <tr
                    key={id ? id : index}
                    onDoubleClick={() => {
                      onOpenRow(row);
                    }}
                  >
                    {columns?.length &&
                      columns?.map((column) => {
                        if (column.type === "image") {
                          return (
                            <td
                              className={clsx(
                                border && styles.border,
                                equal && styles.equal,
                              )}
                              key={column.key}
                            >
                              {row[column.key] ? (
                                <div
                                  className={styles.imgWrapper}
                                  style={{
                                    justifyContent: left
                                      ? "flex-start"
                                      : "center",
                                  }}
                                >
                                  <img
                                    src={row[column.key]}
                                    alt={row[column.key]}
                                  />
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                          );
                        }
                        if (column.type === "datetime") {
                          return (
                            <td
                              className={clsx(
                                border && styles.border,
                                equal && styles.equal,
                              )}
                              key={column.key}
                            >
                              {row[column.key]
                                ? moment(row[column.key]).format(
                                    "DD.MM.YYYY, HH:mm",
                                  )
                                : "-"}
                            </td>
                          );
                        }
                        return (
                          <td
                            style={{
                              backgroundColor: returnColor(
                                Number(row[column.key]),
                              ),
                            }}
                            className={clsx(
                              border && styles.border,
                              equal && styles.equal,
                            )}
                            key={column.key}
                            data-tooltip-id={String(row[column.key])}
                            data-tooltip-content={String(row[column.key])}
                          >
                            {row[column.key] || row[column.key] === 0 ? (
                              <>
                                <span
                                  data-tip={row[column.key]}
                                  data-for={String(row[column.key])}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: row[column.key],
                                    }}
                                  />
                                </span>
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>

      {!rows?.length && (
        <div className={styles.empty}>
          <p className={styles.label}>{noData}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
