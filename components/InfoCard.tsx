interface Prop {
  label: string;
  count: any;
  icon?: any;
  className?: any;
}

const InfoCard = ({ label, count, icon, className }: Prop) => {
  return (
    <div className="info-card-main">
      <div className="flex flex-col gap-1">
        <p className="text-slate-600 text-xs font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-800">
          {count || "No uploads yet"}
        </p>
      </div>
      <div className={className}>{icon}</div>
    </div>
  );
};

export default InfoCard;
