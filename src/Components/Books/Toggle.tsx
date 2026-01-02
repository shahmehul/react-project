interface ToggleProps {
    enabled: boolean;
    onToggle: (value: boolean) => void;
  }
  
  export default function Toggle({ enabled, onToggle }: ToggleProps) {
    return (
      <label style={{ display: "block", marginBottom: "16px" }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={e => onToggle(e.target.checked)}
        />
        {" "}Group by publication year
      </label>
    );
  }
  