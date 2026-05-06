type InsightInput = {
  insight: string;
};

export default function InsightsCard({ insight }: InsightInput) {
  return (
    <section className="card insight-card">
      <div className="label">Historical insight</div>
      <div className="insight-text">{insight}</div>
    </section>
  );
}
