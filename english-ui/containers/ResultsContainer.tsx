import 'tailwindcss/tailwind.css'

interface Props {
  children?: React.ReactNode;
}

const ResultsContainer: React.FC<Props> = ({ children }) => {
    return (
        <div
            id='result-container'
            className='bg-indigo-100 w-100 rounded-xl p-6 py-10 flex flex-col justify-end items-center'
            style={{ height: '450px', overflow: 'auto' }}
        >
          {children}
      </div>
    );
  };
  export default ResultsContainer;
  