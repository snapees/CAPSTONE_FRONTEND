import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Address from '../address/Address';
import ShowOrder from '../showorder/ShowOrder';
import { useNavigate } from 'react-router-dom';

const steps = ['Add your Address', 'Your order details', 'Order Confirmed'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate()

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleNext(event);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:"space-between",
     
        paddingInline: '6.7rem',
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 2 && (
        <React.Fragment>
          <Typography sx={{ ml:-50 }} >
           <ShowOrder/>
          </Typography>
        </React.Fragment>
      )}
      {activeStep === steps.length - 3 && (
        <React.Fragment>
          <Typography sx={{ mt: -60, mb: 2 }}>
            <Address />
            <div>Press enter to add the address and then click on next </div>
          </Typography>
        </React.Fragment>
      )}
      {activeStep === steps.length - 1 && (
        <React.Fragment>
          <Typography >
            Your order is confirmed.
          </Typography>
        </React.Fragment>
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: -40, mb: 38 }}>Thank You</Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
        
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} onKeyDown={handleKeyDown}/>
            <Button onClick={handleNext}    >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              {activeStep === steps.length ? navigate('/Products') : ''}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
