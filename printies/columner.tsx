import * as React from 'react';

export interface ColumnerProps {
    columns: number;
}
export class Columner extends React.Component<ColumnerProps> {
    render() {
        const { children, columns } = this.props;
        return <div style={{ columnCount: columns }}>{children}</div>
    }
}