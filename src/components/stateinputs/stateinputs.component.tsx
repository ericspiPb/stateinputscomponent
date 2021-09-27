import { CSSProperties, Component, ReactNode, ChangeEvent } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { clone, capitalize, merge } from 'lodash';

declare type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface StateInputGrids {
  xs?: {
    left?: {
      span: number;
      offset?: number;
    }
    right?: {
      span: number;
      offset?: number;
    }
  }
  sm?: {
    left?: {
      span: number;
      offset?: number;
    }
    right?: {
      span: number;
      offset?: number;
    }
  }
  md?: {
    left?:  {
      span: number;
      offset?: number;
    }
    right?:  {
      span: number;
      offset?: number;
    }
  }
  lg?: {
    left?:  {
      span: number;
      offset?: number;
    }
    right?:  {
      span: number;
      offset?: number;
    }
  }
  xl?: {
    left?:  {
      span: number;
      offset?: number;
    }
    right?:  {
      span: number;
      offset?: number;
    }
  }
}

export interface StateInputClasses {
  container?: string;
  row?: string;
  col?: string;
  asterisk?: string;
  text?: string;
  input?: string;
  select?: string;
  option?: string;
}

export interface StateInputStyles {
  container?: CSSProperties;
  row?: CSSProperties;
  col?: CSSProperties;
  asterisk?: CSSProperties;
  text?: CSSProperties;
  input?: CSSProperties;
  select?: CSSProperties;
  option?: CSSProperties;
}

export interface StateInputStateItem {
  asterisk?: boolean;
  value: number | string;
}

export interface StateInputState {
  [key: string]: StateInputStateItem | StateInputStateItem[];
}

export interface StateInputsProps {
  className?: StateInputClasses;
  style?: StateInputStyles;
  grid: StateInputGrids;
  initState: StateInputState;
}

export default class StateInputs extends Component<StateInputsProps, StateInputState> {
  state: StateInputState;

  constructor(public props: StateInputsProps) {
    super(props);
    this.state = props.initState;
  }

  handleStateChange = (event: ChangeEvent<FormControlElement>): void => {
    const tagetKey = event.target.name;
    let newStates: StateInputState = clone(this.state);

    Object.entries(this.state).forEach(([key, state]) => {
      if (!Array.isArray(state)) {
        // @ts-ignore: disable type checking ts(2339)
        newStates[key].value = key === tagetKey ? event.target.value : state.value;
      }
    });

    this.setState(newStates);
  }

  renderStateInputs = (): ReactNode => {
    return Object.entries(this.state).map(([key, state], index) => {
      let inputElement;
      if (Array.isArray(state)) {
        inputElement = <Form.Control as='select' name={key} key={key} id={key} className={this.props.className?.select} style={this.props.style?.select}>
          {state.map((item: StateInputStateItem) => (
            item.value === '' ?
              <option value='' className={this.props.className?.option} style={this.props.style?.option}>Choose Me</option> :
              <option key={item.value} value={item.value} className={this.props.className?.option} style={this.props.style?.option}>{item.value}</option>
          ))}
        </Form.Control>;
      } else {
        switch (key) {
          case 'button':
          case 'checkbox':
          case 'color':
          case 'date':
          case 'datetime-local':
          case 'email':
          case 'file':
          case 'hidden':
          case 'image':
          case 'month':
          case 'number':
          case 'password':
          case 'radio':
          case 'range':
          case 'reset':
          case 'search':
          case 'submit':
          case 'tel':
          case 'text':
          case 'time':
          case 'url':
          case 'week':
            inputElement = <Form.Control as='input' type={key} value={state.value} onChange={this.handleStateChange} required={!Array.isArray(state) && state.asterisk}
                              name={key} key={key} className={this.props.className?.input} style={this.props.style?.input}
                           />;
            break;
          case 'mobile':
          case 'phone':
            inputElement = <Form.Control as='input' type='tel' value={state.value} onChange={this.handleStateChange} required={!Array.isArray(state) && state.asterisk}
                              name={key} key={key} className={this.props.className?.input} style={this.props.style?.input}
                           />;
            break;
          default:
            inputElement = <Form.Control as='input' type='input' value={state.value} onChange={this.handleStateChange} required={!Array.isArray(state) && state.asterisk}
                              name={key} key={key} className={this.props.className?.input} style={this.props.style?.input}
                           />;
        }
      }

      return (
        <Row key={key} className={this.props.className?.row} style={this.props.style?.row}>
          <Col key={'l' + index} className={this.props.className?.col} style={this.props.style?.col}
            xs={{ span: this.props.grid.xs?.left?.span ?? 12, offset: this.props.grid.xs?.left?.offset ?? 0 }}
            sm={{ span: (this.props.grid.sm?.left?.span ?? 12), offset: this.props.grid.sm?.left?.offset ?? 0 }}
            md={{ span: this.props.grid.md?.left?.span ?? 6, offset: this.props.grid.md?.left?.offset ?? 0 }}
            lg={{ span: this.props.grid.lg?.left?.span ?? this.props.grid.md?.left?.span ?? 6,
                  offset: this.props.grid.lg?.left?.offset ?? this.props.grid.md?.left?.offset ?? 0 }}
            xl={{ span: this.props.grid.xl?.left?.span ?? this.props.grid.lg?.left?.span ?? this.props.grid.md?.left?.span ?? 6,
                  offset: this.props.grid.xl?.left?.offset ?? this.props.grid.lg?.left?.offset ?? this.props.grid.md?.left?.offset ?? 0 }}
          >
            <Form.Label key={index} htmlFor={key}>
              { !Array.isArray(state) && state.asterisk && <Form.Label key={index} htmlFor={key} className={this.props.className?.asterisk} style={merge({ color: 'red' }, this.props.style?.asterisk)}>*</Form.Label> }
              <span className={this.props.className?.text} style={this.props.style?.text}>{ capitalize(key) }</span>
            </Form.Label>
          </Col>
          <Col key={'r' + index} className={this.props.className?.col} style={this.props.style?.col}
            xs={{ span: this.props.grid.xs?.right?.span ?? 12, offset: this.props.grid.xs?.right?.offset ?? 0 }}
            sm={{ span: this.props.grid.sm?.right?.span ?? 12, offset: this.props.grid.sm?.right?.offset ?? 0 }}
            md={{ span: this.props.grid.md?.right?.span ?? 6, offset: this.props.grid.md?.right?.offset ?? 0 }}
            lg={{ span: this.props.grid.lg?.right?.span ?? this.props.grid.md?.right?.span ?? 6,
                  offset: this.props.grid.lg?.right?.offset ?? this.props.grid.md?.right?.offset ?? 0 }}
            xl={{ span: this.props.grid.xl?.right?.span ?? this.props.grid.lg?.right?.span ?? this.props.grid.md?.right?.span ?? 6,
                  offset: this.props.grid.xl?.right?.offset ?? this.props.grid.lg?.right?.offset ?? this.props.grid.md?.right?.offset ?? 0 }}
          >
            {inputElement}
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <Form>
        <Container className={this.props.className?.container}>
          {
            this.renderStateInputs()
          }
        </Container>
      </Form>
    )
  }

}
