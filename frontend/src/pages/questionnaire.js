import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const Questionnaire = () => {
  const { user } = useAuthContext();
  const [answers, setAnswers] = useState({
    job: 'Student',
    goal: 'Academics',
    sleep: '8',
    sittingHour: '2',
    gender: 'male',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const QUESTIONS = [
    'What is your profession?',
    'What goals are you planning to achieve?',
    'How many hours do you sleep?',
    'What is your average sitting hour?',
    'What is your gender?',
  ];

  const onOptionChange = (field, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [field]: value,
    }));
  };

  const infoSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/questionnaire/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...answers, user: user._id }),
        credentials: 'include', 
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Questionnaire submitted successfully:', data);
        navigate('/dashboard');
      } else {
        setError(data.error || 'An error occurred while submitting the questionnaire.');
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-900">
        <div className="flex flex-col bg-slate-900">
          <div className=" font-oswald font-bold text-[50px] uppercase ml-48 mt-12 mb-10">
            HELLO ASPIRANT,
          </div>
          <div className="flex">
            <div className=" border-cyan-400 border-4 rounded-[40px] w-2/5 ml-48 mb-52 shadow-2xl">
              <div className="flex flex-col gap-3  w-96 ml-40 my-11 mt-16">
                <div>
                  <div className=" font-oswald font-semibold text-xl py-3">
                    {QUESTIONS[0]}
                  </div>
                  <div>
                    <select
                      value={answers.job}
                      onChange={(e) => onOptionChange("job", e.target.value)}
                      className="bg-sky-950   border-cyan-400 border-4 rounded-[40px] w-full"
                    >
                      <option value="" disabled hidden>
                        Select your profession
                      </option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Driver">Driver</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className=" font-oswald text-xl font-semibold py-3">
                    {QUESTIONS[1]}
                  </div>
                  <div>
                    <select
                      value={answers.goal}
                      onChange={(e) => onOptionChange("goal", e.target.value)}
                      className="bg-sky-950   border-cyan-400 border-4 rounded-[40px] w-full"
                    >
                      <option value="" disabled hidden>
                        Select your goal
                      </option>
                      <option value="Academics">Academics</option>
                      <option value="Self Improvement">Self Improvement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className=" font-oswald text-xl font-semibold py-3">
                    {QUESTIONS[2]}
                  </div>
                  <div>
                    <select
                      value={answers.sleep}
                      onChange={(e) => onOptionChange("sleep", e.target.value)}
                      className="bg-sky-950   border-cyan-400 border-4 rounded-[40px] w-full"
                    >
                      <option value="" disabled hidden>
                        Select your sleeping span
                      </option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                      <option value="10">10 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className=" font-oswald text-xl font-bold py-3">
                    {QUESTIONS[3]}
                  </div>
                  <div>
                    <select
                      value={answers.sittingHour}
                      onChange={(e) =>
                        onOptionChange("sittingHour", e.target.value)
                      }
                      className="bg-sky-950   border-cyan-400 border-4 rounded-[40px] w-full"
                    >
                      <option value="" disabled hidden>
                        Select your sitting span
                      </option>
                      <option value="0.5">half an hour</option>
                      <option value="1">1 hours</option>
                      <option value="1.5">1 and a half hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hour</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className=" font-oswald text-xl font-bold py-3">
                    {QUESTIONS[4]}
                  </div>
                  <div>
                    <select
                      value={answers.gender}
                      onChange={(e) => onOptionChange("gender", e.target.value)}
                      className="bg-sky-950   border-cyan-400 border-4 rounded-[40px] w-full"
                    >
                      <option value="" disabled hidden>
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                onClick={infoSubmit}
                className="bg-sky-950 text-1xl font-bold mt-3 mb-9 hover:bg-cyan-500 py-2 px-4 rounded-[10px] border-4 border-cyan-400 ml-auto mr-40 w-min"
              >
                SUBMIT
              </div>
            </div>
            <div className=" w-1/2">
              <img
                className="ml-auto mr-36 h-auto w-3/4 "
                src="/quest2e.png"
                alt="My"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Questionnaire;