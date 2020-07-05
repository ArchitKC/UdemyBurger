import React from 'react';

import classes from './Modal.css';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxilliary'

const modal = (props) =>(
    <Aux>
        <BackDrop
            display={props.display}
            clicked = {props.closeModal}
        ></BackDrop>
        <div 
            className={classes.Modal}
            style={{
                transform: props.display?'translateY(0)':'translateY(-100vh)',    
                opacity : props.display? '1':'0'
            }}        
        >
            {props.children}
        </div>
    </Aux>
); 

export default React.memo(
    modal,
    (prevProps, nextProps) =>
      nextProps.display === prevProps.display &&
      nextProps.children === prevProps.children
  );