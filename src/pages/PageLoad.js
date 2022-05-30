import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import './PageLoad.css';

// ----------------------------------------------------------------------

export default function PageLoad() {
  return (
    
    <div> 
     <body>
    <div class="grid">
      <div class="loader" >
        <h1>Loader 1</h1> 
        <div id="ld1">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="loader">
        <div id="ld2">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="loader">
        <div id="ld3">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="loader" >
        <div id="ld4">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </div>
      
  );
}
