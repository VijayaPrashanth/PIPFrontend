import { Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

const ShoppingCartBadge =(size)=>{
    return(
        <>
            <a href='/cart' target='_blank'>
                <Badge badgeContent={size} color="secondary" overlap="rectangular">
                    <ShoppingCart fontSize='large' color="secondary" />
                </Badge>
            </a>
        </>
    );
    
}

export default ShoppingCartBadge;