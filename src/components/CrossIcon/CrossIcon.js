import classnames from "classnames";
import styles from './CrossIcon.module.scss';

const CrossIcon = ({type = "primary", onClick}) => {
    return <div onClick={onClick} className={classnames(styles.cross, {[styles[type]]: styles[type]})}/>
};

export default CrossIcon;
