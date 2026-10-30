type Props = {
  id: string;
  action: (form: FormData) => Promise<void>;
  canUp: boolean;
  canDown: boolean;
  labels?: [string, string];
  arrows?: [string, string];
};

// One form per direction: a button's own name/value isn't reliably sent with server actions.
export default function MoveButtons({ id, action, canUp, canDown, labels = ["Yuqoriga", "Pastga"], arrows = ["↑", "↓"] }: Props) {
  return (
    <div className="adm-move">
      {(["up", "down"] as const).map((dir, i) => (
        <form key={dir} action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="dir" value={dir} />
          <button className="adm-icon" disabled={dir === "up" ? !canUp : !canDown} aria-label={labels[i]} data-dir={dir}>
            {arrows[i]}
          </button>
        </form>
      ))}
    </div>
  );
}
