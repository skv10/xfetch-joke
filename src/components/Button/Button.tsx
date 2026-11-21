type Props = { loading: boolean; onClick: () => void; label?: string };

export default function Button({ loading, onClick, label = "Fetch joke" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading ? "Fetching..." : label}
    </button>
  );
}
