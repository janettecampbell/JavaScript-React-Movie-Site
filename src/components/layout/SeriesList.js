import SeriesCard from "./SeriesCard";

const SeriesList = (props) => {
  const { popularSeries } = props;

  return (
    <div className="series-items">
      {popularSeries.map((series) => (
        <SeriesCard key={series.id} series={series} />
      ))}
    </div>
  );
};

export default SeriesList;
