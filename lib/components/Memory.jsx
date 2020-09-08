import { run } from 'uebersicht'

const Memory = ({ output }) => {
  if (!output) return;
  const { usage } = output;

  return (
    <div className="pill mic">
      {usage.split(' ').join('/')}
    </div>
  );
};

export default Memory;
