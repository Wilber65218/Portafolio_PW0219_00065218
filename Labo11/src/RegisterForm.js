import React, {Component} from "react";

class RegisterForm extends Component{
    options = [
        'Lunes de 7:00 a 05:10',
        'Martes de 13:30 a 15:30',
        'Miercoles de 7:00 a 05:10',
        'Jueves de 13:30 a 15:30',
        'Viernes de 9:00 a 11:00',
    ];

    carnet_regex = new RegExp("^[0-9]{8}$");
    state = {
        carnet: "",
        schedule: this.options[0],
        isLate:true,
        isDisable: true
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        let returnValue = {
            [name]:Value
        }
        if(name === "carnet"){
            if(this.carnet_regex.test(value)){
                returnValue.isDisable =false;
            }else {
                returnValue.isDisable = true;
            }
        }
        this.setState(returnValue)
    }
    render(){
        return(
            <div className = "jumbotron">
                <h1> Registro de Laboratorio</h1>
                <div className = "form-group">
                    <label className = "col-sm-2 col-form-label"> Ingrese el carnet</label> 
                    <br/>
                    <input 
                        className="form-control"
                        type="text"
                        name="carnet"
                        value={this.state.carnet}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                    <label>Selecciona el horario:</label>
                    <select
                        name="schedule"
                        className ="form-control custom-control"
                        value = {this.state.schedule}
                        onChange = {this.handleChange}
                    >
                        {this.options.map(elem => {
                            return  <option key = {elem}>{elem}</option>
                        })}

                    </select>
                </div>
                <div style = {{marginLeft: 1 + "em"}} htmlFor = "isLate">
                    <input
                      name="isLate"
                      type="checkbox"
                      onChange={this.handleChange}
                      checked={this.state.isLate}  
                    />
                    <label style ={{marginLeft:1+"em"}} htmlFor="isLate" >
                        Llego tarde?
                    </label>
                </div>
                <div className="form-group">
                    <button 
                      type = "button"
                      className= "btn btn-info"
                      id = "submit_btn"
                      onClick = {()=>{
                          this.props.onSubmit({
                              carnet:this.state.carnet,
                              schedule: this.state.schedule,
                              isLate: this.state.isLate
                          })
                      }} 
                      disabled = {this.state.isDisable}
                      Ingresar 
                    />
                </div>
            </div>
        )
    }
}

export default RegisterForm;