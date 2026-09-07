import { useState } from "react";
import styles from "./ToggleList.module.css";
import {
  BsFillExclamationTriangleFill,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
import { TbChevronDown, TbUsers } from "react-icons/tb";
import { HiCube } from "react-icons/hi2";

const ToggleList = ({ buildings = [] }) => {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className={styles.panel}>
      <div className={styles.list}>
        {buildings.map((building) => {
          const hasChildren = building.floors?.length > 0;
          const isOpen = open.has(building.buildingId);

          return (
            <div key={building.buildingId} className={styles.item}>
              <button
                type="button"
                className={styles.itemBtn}
                onClick={() => hasChildren && toggle(building.buildingId)}
              >
                <div className={styles.left}>
                  <span className={styles.cubeSmall}>
                    <HiCube />
                  </span>
                  <span className={styles.itemTitle}>{building.buildingName}</span>
                </div>

                <div className={styles.right}>
                  <div className={styles.counts}>
                    {/* <span className={`${styles.pill} ${styles.danger}`}>
                      <BsFillExclamationTriangleFill />{" "}
                      <b>{building.unauthorizedCount ?? 0}</b>
                    </span> */}
                    <span className={`${styles.pill} ${styles.warn}`}>
                      <BsFillExclamationCircleFill />{" "}
                      <b>{building.signalOutageCount ?? 0}</b>
                    </span>
                    <span className={`${styles.pill} ${styles.people}`}>
                      <TbUsers /> <b>{building.personnelCount ?? 0}</b>
                    </span>
                  </div>

                  <span className={`${styles.down} ${isOpen ? styles.rot : ""}`}>
                    <TbChevronDown />
                  </span>
                </div>
              </button>

              {hasChildren && (
                <div className={`${styles.children} ${isOpen ? styles.open : ""}`}>
                  {building.floors.map((floor) => (
                    <div key={floor.floorId} className={styles.childRow}>
                      <span className={styles.floor}>{floor.floorName}</span>

                      <div className={styles.counts}>
                        {/* <span className={`${styles.pill} ${styles.danger}`}>
                          <BsFillExclamationTriangleFill />{" "}
                          <b>{floor.unauthorizedCount ?? 0}</b>
                        </span> */}
                        <span className={`${styles.pill} ${styles.warn}`}>
                          <BsFillExclamationCircleFill />{" "}
                          <b>{floor.signalOutageCount ?? 0}</b>
                        </span>
                        <span className={`${styles.pill} ${styles.people}`}>
                          <TbUsers /> <b>{floor.personnelCount ?? 0}</b>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ToggleList;
