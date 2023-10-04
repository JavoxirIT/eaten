import "../../css/custom-component.css"

export function Card({cardTitle, children,cardHeader, onClick}) {
	return (
		<main className="card-wrapper">
			{
				cardHeader && <div className="card-header">
					<h2 className="header-title">{cardTitle}</h2>
					<button onClick={onClick} className="header-btn">
						&times;
					</button>
				</div>
			}
			<div className="card-body">{children}</div>
		</main>
	)
}