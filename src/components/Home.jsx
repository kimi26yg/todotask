import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const features = [
    {
      to: "/TodoList",
      title: "할 일 목록",
      desc: "하루 일과를 효율적으로 관리하세요. 진행 중이거나 완료된 작업을 필터링할 수 있습니다.",
      icon: "📝",
    },
    {
      to: "/Counter",
      title: "카운터",
      desc: "숫자 증가, 감소, 초기화 기능이 있는 간단한 카운터 앱입니다.",
      icon: "🔢",
    },
    {
      to: "/UpDown",
      title: "업 다운 게임",
      desc: "1부터 100 사이의 숫자를 맞춰보세요. 행운과 전략을 시험해보세요!",
      icon: "🎯",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>대시보드</h1>
      <p className={styles.subtitle}>
        React 플레이그라운드에 오신 것을 환영합니다. 시작할 도구를 선택하세요.
      </p>

      <div className={styles.grid}>
        {features.map((feature) => (
          <Link key={feature.to} to={feature.to} className={styles.card}>
            <div className={styles.cardIcon}>{feature.icon}</div>
            <h2 className={styles.cardTitle}>{feature.title}</h2>
            <p className={styles.cardDesc}>{feature.desc}</p>
            <div className={styles.cardArrow}>앱으로 이동 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
