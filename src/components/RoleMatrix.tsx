/* Illustrative permission matrix. Role names anonymised. Replace with real ones if you're allowed to share them. */
const roles = ["Role 01", "Role 02", "Role 03", "Role 04", "Role 05", "Role 06"];
const actions = ["View", "Inspect", "Report", "Assign", "Close"];
const grid = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 0, 0],
  [1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0],
];

export default function RoleMatrix() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-5 sm:p-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] font-mono text-xs">
          <caption className="sr-only">Permissions by role (illustrative)</caption>
          <thead>
            <tr className="text-dim">
              <th className="pb-4 text-left font-normal">role \ action</th>
              {actions.map((a) => (
                <th key={a} className="pb-4 font-normal">
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((r, i) => (
              <tr key={r} className="border-t border-line">
                <th className="py-3 text-left font-normal text-mute">{r}</th>
                {grid[i].map((v, j) => (
                  <td key={j} className="py-3 text-center">
                    {v ? (
                      <span className="inline-block h-2.5 w-2.5 rounded-sm bg-ui" aria-label="allowed" />
                    ) : (
                      <span className="inline-block h-2.5 w-2.5 rounded-sm border border-line" aria-label="not allowed" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-5 font-mono text-[11px] text-dim">
        fig. 2: permissions as data. Illustrative only; real role names are kept private.
      </figcaption>
    </figure>
  );
}
