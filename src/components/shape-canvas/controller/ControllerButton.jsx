import SSCButton from "../../ui/button/SSCButton";

import PropTypes from "prop-types";

function ControllerButton({label, active, onClick}) {
  const getButtonStyle = (isActive) => {
    if(isActive) {
      return {
        fontWeight: 'bold'
      };
    } else {
      return {
        fontWeight: 'normal'
      };
    }
  }

  return (
    <SSCButton 
      label={label}
      style={getButtonStyle(active)}
      onClick={onClick}
    />
  )
}

ControllerButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

ControllerButton.defaultProps = {
  label: 'controller',
  active: false,
  onClick: () => {}
}

export default ControllerButton;