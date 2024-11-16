import { Button } from "react-bootstrap";
import "./AddQuickCard.css"
import { Link } from 'react-router-dom'
export default function AddQuickCard() {
    return (
        <div className="quick-card-container">
            <Link to="/add-quick-property">
                <Button className="quick-card-btn"
                    >اضف اعلان سريع</Button>
            </Link>
        </div>
    )
}