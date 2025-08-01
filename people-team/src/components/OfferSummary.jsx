import React, { useEffect, useState } from 'react';

const COLORS = ['#E20074', '#36A2EB', '#FFCE56', '#FF6384'];

const PieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      {data.map((slice, i) => {
        const [cx, cy, r] = [110, 110, 100];
        const startAngle = (cumulative / total) * 2 * Math.PI;
        const endAngle = ((cumulative + slice.value) / total) * 2 * Math.PI;
        const x1 = cx + r * Math.sin(startAngle);
        const y1 = cy - r * Math.cos(startAngle);
        const x2 = cx + r * Math.sin(endAngle);
        const y2 = cy - r * Math.cos(endAngle);
        const largeArc = slice.value / total > 0.5 ? 1 : 0;
        const pathData = `
          M ${cx} ${cy}
          L ${x1} ${y1}
          A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `;
        cumulative += slice.value;
        return (
          <path
            key={slice.label}
            d={pathData}
            fill={COLORS[i % COLORS.length]}
            stroke="#fff"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

const OfferSummary = ({ token, onClose }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/offer/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setSummary(data);
      } catch {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [token]);

  const chartData = summary
    ? [
        { label: 'Accepted', value: summary.totalOffersAccepted },
        { label: 'Rolled Out', value: summary.totalOfferLettersRolledOut },
        { label: 'Pending', value: summary.pending },
        { label: 'Rejected', value: summary.totalOffersRejected },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-700">Offer Summary</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : summary ? (
          <>
            <div className="flex justify-center">
              <PieChart data={chartData} />
            </div>
            <div className="mt-6 space-y-2 text-center">
              {chartData.map((d, i) => (
                <div key={d.label} className="flex items-center justify-center space-x-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  ></span>
                  <span className="font-semibold">{d.label}:</span>
                  <span>{d.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-red-500">Failed to load summary.</div>
        )}
      </div>
    </div>
  );
};

export default OfferSummary;